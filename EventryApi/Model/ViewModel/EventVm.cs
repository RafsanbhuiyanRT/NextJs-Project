namespace EventryApi.Model.ViewModel;
#nullable disable
public class EventVm
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Details { get; set; }
    public string Location { get; set; }
    public string imageUrl { get; set; }
    public List<InterestedVm> InterestedId { get; set; }
    public List<ParticipantsVm> ParticipantsId { get; set; }
    public string Swags { get; set; }
}

public class InterestedVm
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int EventId { get; set; }


}

public class ParticipantsVm
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int EventId { get; set; }

}
